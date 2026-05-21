
import Container from "@/app/ui/Container/Container"
import OrderSuccess from "@/app/ui/OrderSuccess/OrderSuccess"

export default function Page({ searchParams }: any) {
    const order_id = searchParams?.order_id || '';
    return (
        <Container>
            <OrderSuccess order_id={order_id} />
        </Container>
    )
}
