const fetchImageId = async (lat: any, lng: any) => {
    try {
      const response = await fetch(
        `https://graph.mapillary.com/images?fields=id&closeto=${lat},${lng}&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.mapillaryClientToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return data.data[0].id;
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

export default fetchImageId;