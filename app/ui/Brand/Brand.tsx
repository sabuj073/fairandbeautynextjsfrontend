import { getTopBrands } from '@/lib/apiData';
import Container from '../Container/Container';
import BrandClient from './BrandClient';

export default async function Brand() {
  const brands = await getTopBrands();

  return (
    <Container className="pb-[66px]">
      <BrandClient
        brands={brands?.data ?? []}
        style={brands?.style ?? 'old_style'}
        backgrounds={brands?.backgrounds ?? {}}
        title={brands?.title ?? null}
        subtitle={brands?.subtitle ?? null}
      />
    </Container>
  );
}
