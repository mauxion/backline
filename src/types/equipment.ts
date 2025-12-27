import comboAmps from "../data/comboAmps.json";
import cymbals from "../data/cymbals.json";
import drumsGeneral from "../data/drumsGeneral.json";
import drumsHardware from "../data/drumsHardware.json";
import other from "../data/equipmentOther.json";
import microphones from "../data/microphones.json";
import snares from "../data/snares.json";
import wireless from "../data/wireless.json";
export type EquipmentItem = {
  name: string;
  category?: string;
  subCategory?: string;
  price: number;
  comment: string;
  amount?: number
};

export const equipment = [
  ...comboAmps,
  ...cymbals,
  ...drumsGeneral,
  ...drumsHardware,
  ...other,
  ...microphones,
  ...snares,
  ...wireless] as EquipmentItem[];
