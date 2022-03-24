import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se página contém um heading h2 com o texto 
  Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);

    const haveTheText = screen.getByRole('heading', { level: 2 });
    expect(haveTheText).toHaveTextContent('Page requested not found 😭');
  });

  it(`Teste se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);

    const haveImage = screen.getByAltText(/Pikachu crying because the page/i);
    expect(haveImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
