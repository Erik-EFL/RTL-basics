import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pokeinfo = pokemons[0];
  const { name, summary, foundAt } = pokeinfo;
  const roteLinkName = 'More details';
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: roteLinkName });
      userEvent.click(moreDetailsLink);
      /* A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon; */
      const haveTheText = screen.getByRole(
        'heading', { level: 2, name: `${pokeinfo.name} Details` },
      );
      expect(haveTheText).toBeInTheDocument();
      /* Não deve existir o link de navegação para os detalhes do Pokémon selecionado. */
      expect(moreDetailsLink).not.toBeInTheDocument();
      /* A seção de detalhes deve conter um heading h2 com o texto Summary */
      const summaryHeading = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(summaryHeading).toBeInTheDocument();
      /* A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado. */
      const summaryParagraph = screen.getByText(`${summary}`);
      expect(summaryParagraph).toBeInTheDocument();
    });
  it(`Teste se existe na página uma seção com os mapas contendo as 
  localizações do pokémon`,
  () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: roteLinkName });
    userEvent.click(moreDetailsLink);
    /* Na seção de detalhes deverá existir um heading h2 com o
    texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido. */
    const gameLocationsPokemon = screen.getByRole(
      'heading', { level: 2, name: `Game Locations of ${pokeinfo.name}` },
    );
    expect(gameLocationsPokemon).toBeInTheDocument();
    /* Todas as localizações do Pokémon devem ser mostradas na seção de detalhes; */
    foundAt.forEach((cep) => {
      const foundLocation = screen.getByText(`${cep.location}`);
      expect(foundLocation).toBeInTheDocument();
    });
    /* Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização; */
    const testImg = screen.getAllByRole('img', { name: `${name} location` });
    const maps = [...new Set(foundAt.reduce((acc, cep) => [...acc, cep], []))];
    const { map, location } = maps[0];

    expect(testImg).toHaveLength(maps.length);
    /* A imagem da localização deve ter um atributo src com a URL da localização; */
    expect(testImg[0].src).toBe(map);
    /* A imagem da localização deve ter um atributo alt com o texto
    <name> location, onde <name> é o nome do Pokémon; */
    expect(testImg[0].alt).toBe(`${name} location`);

    const foundLocation = screen.getByText(`${location}`);
    expect(foundLocation).toBeInTheDocument();
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: roteLinkName });
      userEvent.click(moreDetailsLink);
      /* A página deve exibir um checkbox que permite favoritar o Pokémon; */
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      /* Cliques alternados no checkbox devem adicionar e remover respectivamente
       o Pokémon da lista de favoritos; */
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      /* O label do checkbox deve conter o texto Pokémon favoritado?; */
      const label = screen.getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
    });
});
