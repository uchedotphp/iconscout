import type { assetType, prices, sortOptions, viewOptions } from '~/data/dataTypes';

export const assetOptions = [
  'all assets',
  '3D illustrations',
  'lottie animations',
  'illustrations',
  'icons',
]

export const filterOptionsDefaultData = {
  asset: 'all-assets' as assetType,
  price: 'free' as prices,
  view: 'pack' as viewOptions,
  sort: 'popular' as sortOptions,
  query: '' as string,
  per_page: 20,
  page: 1,
}

export const searchSuggestions = [
  "Conversation Design",
  "Data design",
  "Crypto",
  "Data design",
  "Conversation Design",
  "Data design",
  "Business",
  "Communication",
  "Internet",
  "Device",
  "Network",
  "Computer",
  "Mobile",
  "Digital",
  "Finance",
  "Technology",
  "Security",
  "Social",
  "Media",
  "Marketing",
  "Web",
  "Design",
  "Development",
  "Business",
  "Communication",
  "Internet",
  "Device",
  "Network",
  "Computer",
  "Mobile",
  "Digital",
  "Finance",
  "Technology",
  "Security",
  "Social",
  "Media",
  "Marketing",
  "Web",
  "Design",
  "Development",
]

export const navItems = [
  { id: 1, title: "All Assets", asset: "all-assets" },
  { id: 2, title: "3D Illustrations", asset: "3d-illustrations" },
  { id: 3, title: "Lottie Animations", asset: "lottie-animations" },
  { id: 4, title: "Illustrations", asset: "illustrations" },
  { id: 5, title: "Icons", asset: "icons" },
]
