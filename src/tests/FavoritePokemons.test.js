import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando a pagina ', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const textContains = screen.getByText(/No favorite pokemon found/i);
    expect(textContains).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    /*     const cards = screen.getByRole('img', { name: 'is marked as favorite' });
    expect(cards.src).toStrictEqual('/star-icon.svg'); */
    const cards = screen.getAllByTestId('pokemon-name');
    expect(cards).toHaveLength(1);
  });
});
