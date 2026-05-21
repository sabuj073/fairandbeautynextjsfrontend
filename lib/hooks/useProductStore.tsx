// import { create } from 'zustand';

// type StoreProps = {
//   price: any;
//   qty: any;
//   combinationImage: any;
//   combinationName: any;
//   sku: string;  // Add sku to the state
//   setSku: (value: string) => void;  // Add setSku function
//   setPriceValue: (value: any) => void;
//   setCombinationImage: (value: any) => void;
//   setQty: (value: any) => void;
//   setCombinationName: (value: any) => void;
//   isSidebarOpen: boolean;
//   setSidebarOpen: (data: boolean) => void;
//   openCart: boolean;
//   setOpenCart: (data: boolean) => void;
//   reviewEvent: any;
//   setReviewEvent: (value: number) => void;
//   selectColoreVariant: any;
//   setSelectColoreVariant: (value: any) => void;
//   lookProduct: any;
//   setLookProduct: (value: any) => void;
//   lookProductLoading: boolean;
//   setLookProductLoading: (value: boolean) => void;
// };

// export const productStore = create<StoreProps>((set, get) => ({
//   price: 0,
//   qty: 0,
//   combinationImage: null,
//   combinationName: null,
//   sku: '',  // Initialize sku with an empty string
//   setSku: (value) => set({ sku: value }),  // Add setSku method
//   setPriceValue: (value) => set({ price: value }),
//   setCombinationImage: (value) => set({ combinationImage: value }),
//   setQty: (value) => set({ qty: value }),
//   setCombinationName: (value) => set({ combinationName: value }),
//   isSidebarOpen: false,
//   setSidebarOpen: (data) => set((state) => ({ isSidebarOpen: data })),
//   openCart: false,
//   setOpenCart: (data) => set((state) => ({ openCart: data })),
//   reviewEvent: null,
//   setReviewEvent: (value) => set({ reviewEvent: value }),
//   selectColoreVariant: [],
//   setSelectColoreVariant: (newVariant) => set((state) => {
//     const existingIndex = state.selectColoreVariant.findIndex(
//       (variant: any) => variant.id === newVariant.id
//     );

//     if (existingIndex !== -1) {
//       // Replace the existing variant with the new one
//       const updatedVariants = [...state.selectColoreVariant];
//       updatedVariants[existingIndex] = newVariant;
//       return { selectColoreVariant: updatedVariants };
//     } else {
//       // Add the new variant
//       return { selectColoreVariant: [...state.selectColoreVariant, newVariant] };
//     }
//   }),
//   lookProduct: [],
//   setLookProduct: (value) => set({ lookProduct: value }),
//   lookProductLoading: false,
//   setLookProductLoading: (value) => set({ lookProductLoading: value }),
// }));
import { create } from 'zustand';

type StoreProps = {
  price: any;
  qty: any;
  regularPrice: number | string;
  combinationImage: any;
  combinationName: any;
  sku: string;
  setSku: (value: string) => void;
  setPriceValue: (value: any) => void;
  setRegularPriceValue: (value: number | string) => void;
  setCombinationImage: (value: any) => void;
  setQty: (value: any) => void;
  setCombinationName: (value: any) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (data: boolean) => void;
  openCart: boolean;
  setOpenCart: (data: boolean) => void;
  reviewEvent: any;
  setReviewEvent: (value: number) => void;
  selectColoreVariant: any[];
  setSelectColoreVariant: (value: any) => void;
  lookProduct: any[];
  setLookProduct: (value: any) => void;
  lookProductLoading: boolean;
  setLookProductLoading: (value: boolean) => void;
};

export const productStore = create<StoreProps>((set, get) => ({
  price: 0,
  regularPrice: '',         // Initialize as empty string
  qty: 0,
  combinationImage: null,
  combinationName: null,
  sku: '',
  setSku: (value) => set({ sku: value }),
  setPriceValue: (value) => set({ price: value }),
  setRegularPriceValue: (value) => set({ regularPrice: value }),
  setCombinationImage: (value) => set({ combinationImage: value }),
  setQty: (value) => set({ qty: value }),
  setCombinationName: (value) => set({ combinationName: value }),
  isSidebarOpen: false,
  setSidebarOpen: (data) => set({ isSidebarOpen: data }),
  openCart: false,
  setOpenCart: (data) => set({ openCart: data }),
  reviewEvent: null,
  setReviewEvent: (value) => set({ reviewEvent: value }),
  selectColoreVariant: [],
  setSelectColoreVariant: (newVariant) =>
    set((state) => {
      const existingIndex = state.selectColoreVariant.findIndex(
        (variant: any) => variant.id === newVariant.id
      );

      if (existingIndex !== -1) {
        const updatedVariants = [...state.selectColoreVariant];
        updatedVariants[existingIndex] = newVariant;
        return { selectColoreVariant: updatedVariants };
      } else {
        return {
          selectColoreVariant: [...state.selectColoreVariant, newVariant],
        };
      }
    }),
  lookProduct: [],
  setLookProduct: (value) => set({ lookProduct: value }),
  lookProductLoading: false,
  setLookProductLoading: (value: boolean) => set({ lookProductLoading: value }),
}));
