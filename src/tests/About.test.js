import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testando o componente about', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getByText(/about pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const infoHeadingH2 = screen.getByRole('heading', { level: 2 }, /About Pokédex/i);
    expect(infoHeadingH2).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/this application/i);
    const paragraphTwo = screen.getByText(/one can filter/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgContains = screen.getByRole('img');
    expect(imgContains.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
