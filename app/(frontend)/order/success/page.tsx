
import Container from "@/app/ui/Container/Container"
import OrderSuccess from "@/app/ui/OrderSuccess/OrderSuccess"

export default async function Page({ searchParams }: any) {
    // Handle searchParams which might be a Promise in Next.js 15
    const params = searchParams instanceof Promise ? await searchParams : searchParams;
    const order_id = params?.order_id || '';
    
    return (
        <Container>
            <OrderSuccess order_id={order_id} />
        </Container>
    )
}
