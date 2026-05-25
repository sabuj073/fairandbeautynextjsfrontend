import { getTopBrands } from '@/lib/apiData';
import Container from '../Container/Container';
import BrandClient from './BrandClient';

type Props = {
  styleOverride?: string;
};

export default async function Brand({ styleOverride }: Props = {}) {
  const brands = await getTopBrands();

  return (
    <Container className="pb-[66px]">
      <BrandClient
        brands={brands?.data ?? []}
        style={styleOverride ?? brands?.style ?? 'old_style'}
        backgrounds={brands?.backgrounds ?? {}}
        title={brands?.title ?? null}
        subtitle={brands?.subtitle ?? null}
      />
    </Container>
  );
}
