import img_e5e0e026 from '@assets/e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg';
import img_0ae16e16 from '@assets/0ae16e16-f81b-407a-90ad-652670d4717f_1782191183495.jpg';
import img_cb8ca954 from '@assets/cb8ca954-aa88-4fd1-bb5f-aedebd9b2010_1782191190903.jpg';
import img_64a5816c from '@assets/64a5816c-c637-4625-a24e-f45ce06f7642_1782191193676.jpg';
import img_2cea92e2 from '@assets/2cea92e2-00ea-4416-a776-24e211c75a3c_1782191169517.jpg';
import img_acb04f3a from '@assets/acb04f3a-ff68-4f10-9573-8a352159e257_1782191208758.jpg';
import img_228fa0bd from '@assets/228fa0bd-981d-4aaf-ba60-d89cacc249d4_1782191215299.jpg';
import img_936cd050 from '@assets/936cd050-fab4-4081-9cc1-3a51e001db95_1782191230769.jpg';
import img_eb59e23c from '@assets/eb59e23c-77b3-4e9e-aad6-36d4f319a4be_1782191151335.jpg';
import img_e78948d9 from '@assets/e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg';
import img_7278f6a4 from '@assets/7278f6a4-3588-4878-8043-12715e50fd5b_1782191234202.jpg';
import img_2c2770a8 from '@assets/2c2770a8-de1d-4587-8356-6d2203d2282b_1782191237465.jpg';
import img_bb1 from '@assets/image_1782191247115.png';
import img_bb2 from '@assets/image_1782191253301.png';
import img_bb3 from '@assets/image_1782191263151.png';

const IMAGE_MAP: Record<string, string> = {
  'e5e0e026-5762-42f2-8179-798708c0be68_1782191177966.jpg': img_e5e0e026,
  '0ae16e16-f81b-407a-90ad-652670d4717f_1782191183495.jpg': img_0ae16e16,
  'cb8ca954-aa88-4fd1-bb5f-aedebd9b2010_1782191190903.jpg': img_cb8ca954,
  '64a5816c-c637-4625-a24e-f45ce06f7642_1782191193676.jpg': img_64a5816c,
  '2cea92e2-00ea-4416-a776-24e211c75a3c_1782191169517.jpg': img_2cea92e2,
  'acb04f3a-ff68-4f10-9573-8a352159e257_1782191208758.jpg': img_acb04f3a,
  '228fa0bd-981d-4aaf-ba60-d89cacc249d4_1782191215299.jpg': img_228fa0bd,
  '936cd050-fab4-4081-9cc1-3a51e001db95_1782191230769.jpg': img_936cd050,
  'eb59e23c-77b3-4e9e-aad6-36d4f319a4be_1782191151335.jpg': img_eb59e23c,
  'e78948d9-787e-4d94-ba0f-dddc6690730c_1782191160787.jpg': img_e78948d9,
  '7278f6a4-3588-4878-8043-12715e50fd5b_1782191234202.jpg': img_7278f6a4,
  '2c2770a8-de1d-4587-8356-6d2203d2282b_1782191237465.jpg': img_2c2770a8,
  'image_1782191247115.png': img_bb1,
  'image_1782191253301.png': img_bb2,
  'image_1782191263151.png': img_bb3,
};

export function getProductImageUrl(filename: string): string {
  return IMAGE_MAP[filename] || '';
}

export function getProductImages(images: string[]): string[] {
  return images.map(getProductImageUrl).filter(Boolean);
}

export const categoryImages: Record<string, string> = {
  mattresses: img_e5e0e026,
  pillows: img_acb04f3a,
  sofas: img_eb59e23c,
  curtains: img_7278f6a4,
  'bean-bags': img_bb1,
  bedsheets: img_936cd050,
};

export const heroImages = [
  { src: img_e78948d9, tag: 'Luxury Sofas', headline: 'Crafting Luxury.', sub: 'Manufacturing Comfort.' },
  { src: img_e5e0e026, tag: 'Orthopedic Mattresses', headline: 'Sleep Better.', sub: 'Live Better.' },
  { src: img_7278f6a4, tag: 'Premium Curtains', headline: 'Dress Your', sub: 'Windows in Style.' },
  { src: img_eb59e23c, tag: 'Designer Sofas', headline: 'Your Home.', sub: 'Your Statement.' },
  { src: img_bb1, tag: 'Bean Bags & Loungers', headline: 'Relax in', sub: 'Premium Comfort.' },
];
