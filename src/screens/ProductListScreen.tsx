import * as React from 'react';

import { ProductList } from '../components/ProductsList';
import { useAPI } from '../utils/API';

export default function ProductListScreen() {
  const { value } = useAPI();

  return (
    <ProductList data={value} />
  );
}
