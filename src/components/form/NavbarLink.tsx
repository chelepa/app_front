import { Nav } from "react-bootstrap";

export const NavbarLink = ({ to, value }: { to: string, value: string }) => {
    return <Nav.Link href={to}>{value}</Nav.Link>;
}