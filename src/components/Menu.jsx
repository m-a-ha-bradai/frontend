import React from 'react';
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//Personnalisation du badge panier

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const Menu = () => {
  const cartCount = 0; //  changer cette valeur pour voir le badge

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand>Gestion Commerciale</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
          <Nav.Link as={Link} to="/scategories">Sous Catégories</Nav.Link>
          <Nav.Link as={Link} to="/articles">Liste des Articles</Nav.Link>
          <Nav.Link as={Link} to="/articlescard">Articles Card</Nav.Link>
          <Nav.Link as={Link} to="/chat">ChatBot</Nav.Link>
         <Nav.Link as={Link} to="/chat_2">ChatBot_2</Nav.Link>
         <Nav.Link as={Link} to="/artpage">Articles page</Nav.Link>



        </Nav>

        <Form className="d-flex me-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="success">Chercher</Button>
        </Form>

        <Link to="/cart" className="d-flex align-items-center">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartCount}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Menu;
