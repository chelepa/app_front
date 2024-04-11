import { Nav } from "react-bootstrap";

export const NavbarLink = ({ to, hidden, value }: { to: string, hidden:boolean, value: string }) => {
    return (
        <Nav.Link href={to} hidden={hidden}>{value}</Nav.Link>
    );
}