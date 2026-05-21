import axios from "axios";

export const getCart = async (user_id: any) => {
    try {
        const { data } = await axios.post(
            `/api/cart/get`,
            {
                user_id: user_id,
            }
        );
        return {
            data: data.data,
            totalQuantity: data.totalQuantity,
        };
    } catch (error) {
        console.log(error)
    }
}