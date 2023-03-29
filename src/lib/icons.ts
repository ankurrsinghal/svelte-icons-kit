import HeroIcons from './icons-outline.json';
import FeatherIcons from './feather-icons.json';
import IconoirIcons from './iconoir-icons.json';
import HeroIconsTags from './hero-tags.json';
import FeatherIconsTags from './feather-tags.json';
import IconoirIconsTags from './iconoir-tags.json';

export const heroIcons = HeroIcons.map(icon => ({ ...icon, tags: HeroIconsTags[icon.label] ?? [] }));
export const featherIcons = FeatherIcons.map(icon => ({ ...icon, tags: FeatherIconsTags[icon.label] ?? [] }));
export const iconoirIcons = IconoirIcons.map(icon => ({ ...icon, tags: IconoirIconsTags[icon.label] ?? [] }));