import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe(` Teste se o topo da aplicação contém um conjunto fixo de links de 
navegação.`, () => {
  it(`Testa se os links do componente app contem os textos:
   Home, About e Favorite Pokémons`, () => {
    renderWithRouter(<App />);
    const homeText = screen.getByText(/Home/i);
    const aboutText = screen.getByText(/About/i);
    const favoriteText = screen.getByText(/Favorite Pokémons/i);

    expect(homeText).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(favoriteText).toBeInTheDocument();
  });

  it('Testa se o link Home leva a rota /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o link About leva a rota /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o link Favorite Pokémons leva a rota /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
