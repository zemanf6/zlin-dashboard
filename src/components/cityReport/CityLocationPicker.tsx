import { useEffect, useMemo, useRef, useState } from "react";
import L, { type LatLngExpression, type Marker as LeafletMarker } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LoaderCircle, MapPin, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

export type CityLocation = { lat: number; lon: number; label: string };

type SearchResult = { place_id: number; display_name: string; lat: string; lon: string };

const ZLIN_CENTER: LatLngExpression = [49.2244, 17.6627];
const ZLIN_BOUNDS = { south: 49.12, north: 49.32, west: 17.48, east: 17.82 };

const markerIcon = L.divIcon({
  className: "city-map-marker-wrap",
  html: '<span class="city-map-marker"><i></i></span>',
  iconSize: [32, 42],
  iconAnchor: [16, 40],
});

function isInZlin(lat: number, lon: number) {
  return lat >= ZLIN_BOUNDS.south && lat <= ZLIN_BOUNDS.north && lon >= ZLIN_BOUNDS.west && lon <= ZLIN_BOUNDS.east;
}

function MapInteraction({ location, onPick }: { location: CityLocation | null; onPick: (lat: number, lon: number) => void }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lon], 19, { duration: 0.7 });
  }, [location, map]);
  useMapEvents({ click: ({ latlng }) => onPick(latlng.lat, latlng.lng) });
  if (!location) return null;
  return (
    <Marker
      position={[location.lat, location.lon]}
      icon={markerIcon}
      draggable
      eventHandlers={{ dragend: (event) => { const point = (event.target as LeafletMarker).getLatLng(); onPick(point.lat, point.lng); } }}
    />
  );
}

export function CityLocationPicker({ value, location, onValueChange, onLocationChange }: {
  value: string;
  location: CityLocation | null;
  onValueChange: (value: string) => void;
  onLocationChange: (location: CityLocation | null) => void;
}) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const query = value.trim();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (query.length < 3 || location?.label === value) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams({ format: "jsonv2", limit: "6", countrycodes: "cz", bounded: "1", viewbox: "17.48,49.32,17.82,49.12", q: `${query}, Zlín` });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { signal: controller.signal, headers: { "Accept-Language": "cs" } });
        if (!response.ok) throw new Error();
        setResults((await response.json()) as SearchResult[]);
        setMessage("");
      } catch (error) {
        if ((error as Error).name !== "AbortError") setMessage("Adresu se teď nepodařilo vyhledat. Zkuste to znovu nebo vyberte místo přímo v mapě.");
      } finally { setIsSearching(false); }
    }, 450);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query, location?.label, value]);

  const reverseGeocode = async (lat: number, lon: number) => {
    if (!isInZlin(lat, lon)) { setMessage("Vyberte prosím místo na území města Zlína."); return; }
    setMessage("Zjišťuji adresu vybraného místa…");
    try {
      const params = new URLSearchParams({ format: "jsonv2", lat: String(lat), lon: String(lon), zoom: "18", addressdetails: "1" });
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, { headers: { "Accept-Language": "cs" } });
      if (!response.ok) throw new Error();
      const data = (await response.json()) as { display_name?: string };
      const label = data.display_name ?? `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      onValueChange(label); onLocationChange({ lat, lon, label }); setMessage(""); setIsOpen(false);
    } catch { setMessage("Bod je vybraný. Přesnou adresu se nepodařilo načíst."); const label = `${lat.toFixed(5)}, ${lon.toFixed(5)}, Zlín`; onValueChange(label); onLocationChange({ lat, lon, label }); }
  };

  const selectResult = (result: SearchResult) => {
    const lat = Number(result.lat); const lon = Number(result.lon);
    onValueChange(result.display_name); onLocationChange({ lat, lon, label: result.display_name }); setResults([]); setIsOpen(false); setMessage("");
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) { setMessage("Tento prohlížeč neumí zjistit aktuální polohu."); return; }
    setIsLocating(true); setMessage("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setIsLocating(false); void reverseGeocode(coords.latitude, coords.longitude); },
      () => { setIsLocating(false); setMessage("Polohu se nepodařilo zjistit. Povolte přístup k poloze nebo vyberte místo v mapě."); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const mapCenter = useMemo<LatLngExpression>(() => location ? [location.lat, location.lon] : ZLIN_CENTER, [location]);

  return <div className="city-location-picker" ref={pickerRef}>
    <label className="city-report-location"><span>Adresa nebo přesné místo ve Zlíně</span><div><MapPin size={19} /><input value={value} autoComplete="off" onFocus={() => setIsOpen(true)} onChange={(event) => { onValueChange(event.target.value); onLocationChange(null); setResults([]); setIsOpen(true); }} placeholder="Začněte psát adresu…" />{isSearching && <LoaderCircle className="city-location-picker__loader" size={18} />}</div></label>
    {isOpen && query.length >= 3 && <div className="city-report-suggestions" role="listbox">{results.map((item) => <button type="button" role="option" onClick={() => selectResult(item)} key={item.place_id}><MapPin size={16} /><span>{item.display_name}</span></button>)}{!isSearching && results.length === 0 && <p>Nic jsme zatím nenašli. Zkuste adresu upřesnit nebo klikněte do mapy.</p>}</div>}
    <button className="city-report-location-button" type="button" onClick={useCurrentLocation} disabled={isLocating}>{isLocating ? <LoaderCircle className="city-location-picker__loader" size={17} /> : <Navigation size={17} />} {isLocating ? "Zjišťuji polohu…" : "Použít moji aktuální polohu"}</button>
    {message && <p className="city-report-location-hint" role="status">{message}</p>}
    <div className="city-report-map"><MapContainer center={mapCenter} zoom={14} minZoom={12} maxZoom={20} scrollWheelZoom className="city-report-map__canvas"><TileLayer maxNativeZoom={19} maxZoom={20} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapInteraction location={location} onPick={(lat, lon) => void reverseGeocode(lat, lon)} /></MapContainer><div className="city-report-map__help"><MapPin size={16} /><span>{location ? "Bod můžete přesunout nebo kliknout jinam" : "Kliknutím do mapy označte přesné místo"}</span></div></div>
  </div>;
}
