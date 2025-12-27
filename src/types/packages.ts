export type PackageDef = {
  id: string;
  name: string;
  highlight?: boolean;
  items: PackageItem[];
  comment?: string;
};

export type PackageItem = {
  name: string
  amount?: number
}