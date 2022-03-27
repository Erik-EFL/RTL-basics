import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js>',
  () => {
    const pokeinfo = pokemons[0];
    const { name, averageWeight } = pokeinfo;

    it(`Teste se é renderizado um card com as informações de determinado 
  pokémon.`, () => {
      renderWithRouter(<Pokemon pokemon={ pokeinfo } isFavorite />);
      /* Testa se o nome correto do Pokémon deve ser mostrado na tela */
      expect(screen.getByTestId('pokemon-name')).toBeInTheDocument(pokeinfo.name);
      /* Testa se o tipo correto do pokémon deve ser mostrado na tela */
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokeinfo.type);
      /* Testa se o peso médio do pokémon deve ser exibido com um texto no formato
       Average weight: <value> <measurementUnit> */
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
      /* Testa se a imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um
        atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon; */
      const imagem = screen.getByRole('img', { name: `${pokeinfo.name} sprite` });
      expect(screen.getByAltText(`${pokeinfo.name} sprite`)).toBeInTheDocument();
      expect(imagem.src).toBe(pokeinfo.image);
    });
    it(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
    navegação para exibir detalhes deste Pokémon.`, () => {
      renderWithRouter(<App />);
      /* Testa o link de navegação para detalhes do Pokémon */
      expect(screen.getByRole('link', { name: 'More details' })).toBeInTheDocument();
    });
    it(`Teste se ao clicar no link de navegação do Pokémon, 
    é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`,
    () => {
      const { history } = renderWithRouter(<Pokemon pokemon={ pokeinfo } isFavorite />);
      /* Clica no link de navegação para detalhes do Pokémon */
      userEvent.click(screen.getByRole('link', { name: 'More details' }));
      /* Testa se o redirecionamento para a página de detalhes do Pokémon foi feito */
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokeinfo.id}`);
    });
    it('Teste se existe um ícone de estrela nos pokemons favoritos', () => {
      renderWithRouter(<Pokemon pokemon={ pokeinfo } isFavorite />);
      /* Testa se o ícone de estrela está presente no card do Pokémon */
      const getImgInf = screen.getByRole(
        'img', { name: `${name} is marked as favorite` },
      );
      expect(getImgInf).toBeInTheDocument();
      expect(getImgInf.src).toMatch(/\/star-icon.svg$/i);
    });
  });
