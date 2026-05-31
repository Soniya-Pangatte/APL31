// GDACS (Global Disaster Alert and Coordination System) API Service
// Fetches real-time, real-world disasters (Red and Orange alerts)

const GDACS_API_URL = 'https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP?alertlevel=Orange,Red';

export const fetchLiveDisasters = async () => {
  try {
    const response = await fetch(GDACS_API_URL);
    if (!response.ok) throw new Error('Failed to fetch from GDACS');
    
    const data = await response.json();
    
    // GDACS returns a GeoJSON FeatureCollection. We map Features to our Campaign schema.
    if (!data || !data.features) return [];

    // Filter out point areas/centroids to avoid duplicates for the same event, 
    // we just want unique events.
    const uniqueEvents = new Map();

    data.features.forEach(feature => {
      const p = feature.properties;
      // Use eventid as unique key to prevent duplicates
      if (!uniqueEvents.has(p.eventid)) {
        
        // Map GDACS event types to a relevant image fallback
        let imageUrl = 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop';
        if (p.eventtype === 'EQ') imageUrl = 'https://images.unsplash.com/photo-1628185038890-482270d4ab7c?q=80&w=2070&auto=format&fit=crop'; // Earthquake
        if (p.eventtype === 'FL') imageUrl = 'https://images.unsplash.com/photo-1542037920-53bc778b4081?q=80&w=2070&auto=format&fit=crop'; // Flood
        if (p.eventtype === 'TC') imageUrl = 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2070&auto=format&fit=crop'; // Cyclone
        if (p.eventtype === 'DR') imageUrl = 'https://images.unsplash.com/photo-1516024921677-709eaabebef0?q=80&w=2070&auto=format&fit=crop'; // Drought
        if (p.eventtype === 'VO') imageUrl = 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=2070&auto=format&fit=crop'; // Volcano

        uniqueEvents.set(p.eventid, {
          id: `gdacs-${p.eventid}`,
          title: p.name || `Disaster in ${p.country}`,
          description: p.htmldescription ? p.htmldescription.replace(/<[^>]+>/g, '') : p.description,
          image_url: imageUrl,
          goal_amount: 500000, // Default estimated need
          raised_amount: 0,
          created_at: p.fromdate,
          status: 'active',
          ngo_id: 'global-relief-pool',
          is_api_generated: true, // Flag to identify auto-generated campaigns
          severity: p.alertlevel,
          donation_logs: []
        });
      }
    });

    // Return the latest 6 unique disasters
    return Array.from(uniqueEvents.values()).slice(0, 6);
  } catch (error) {
    console.error("Error fetching live disasters:", error);
    return [];
  }
};
