



export async function reverseGeocode(lat: number, lng: number) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
    );
    const data = await response.json();

    const address = data.address ?? {};

    const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        "";

    const region =
        address.state ||
        address.region ||
        address.province ||
        "";

    return {
        fullLabel: data.display_name ?? "",
        city,
        region,
        raw: data,
    };
}