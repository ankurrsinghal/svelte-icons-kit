import HeroIcons from './icons-outline.json';
import FeatherIcons from './feather-icons.json';
import IconoirIcons from './iconoir-icons.json';
import HeroIconsTags from './hero-tags.json';
import FeatherIconsTags from './feather-tags.json';
import IconoirIconsTags from './iconoir-tags.json';

export interface Icon {
  id: string;
  label: string;
  svg: string;
  tags: string[];
  collection: string;
}

function createMap<T>(arr: T[], key: keyof T) {
  return arr.reduce((acc, item) => {
    acc.set(item[key], item);
    return acc;
  }, new Map<T[keyof T], T>());
}

export const heroIcons: Icon[] = HeroIcons.map(icon => ({ ...icon, tags: HeroIconsTags[icon.label] ?? [], id: 'hero_' + icon.label, collection: 'hero' }));
export const featherIcons: Icon[] = FeatherIcons.map(icon => ({ ...icon, tags: FeatherIconsTags[icon.label] ?? [], id: 'feather_' + icon.label, collection: 'feather' }));
export const iconoirIcons: Icon[] = IconoirIcons.map(icon => ({ ...icon, tags: IconoirIconsTags[icon.label] ?? [], id: 'iconoir_' + icon.label, collection: 'iconoir' }));

export const heroIconsMap = createMap(heroIcons, 'label');
export const featherIconsMap = createMap(featherIcons, 'label');
export const iconoirIconsMap = createMap(iconoirIcons, 'label');