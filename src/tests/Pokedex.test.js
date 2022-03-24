import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente <Pokedex.js />', () => {
  const buttonID = 'pokemon-name';
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const verifyH2 = screen.getByRole('heading', { level: 2 }, /Encountered pokémons/i);
    expect(verifyH2).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo 
    pokémon é clicado`, () => {
    renderWithRouter(<App />);
    /* Testa o botão deve conter o texto Próximo pokémon */
    const verifyNextItem = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(verifyNextItem).toBeInTheDocument();
    /* Testa se os próximos Pokémons da lista devem ser mostrados,
     um a um, ao clicar sucessivamente no botão; */
    userEvent.click(verifyNextItem);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(verifyNextItem);
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    /* Testa se O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
     se estiver no último Pokémon da lista; */
    for (let i = 2; i < pokemons.length - 1; i += 1) {
      userEvent.click(verifyNextItem);
    }
    expect(screen.getByText(pokemons[pokemons.length - 1].name)).toBeInTheDocument();

    userEvent.click(verifyNextItem);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const verifyNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(verifyNext);
    expect(screen.getAllByTestId(buttonID)).toHaveLength(1);

    userEvent.click(verifyNext);
    expect(screen.getAllByTestId(buttonID)).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokeTypes = pokemons.reduce((arr, pokemon) => [...arr, pokemon.type], []);
    const arrTypes = [...new Set(pokeTypes)];
    /* Testa se a Pokédex tem os botões de filtro */
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(arrTypes.length);
    /* executa a verificação se texto do botão é nome do tipo de filtro
    , ex. Psychic */
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(arrTypes[index]);
    });
    /* Testa se a partir da seleção de um botão de tipo, a Pokédex deve
     circular somente pelos pokémons daquele tipo; */
    /* executa a verificação se existe mais de um pokemon do mesmo tipo por filtro
    e se apertar o botão next somente os pokemons daquele filtro serão exibidos */
    buttons.forEach((button) => {
      userEvent.click(button);
      const pokefilter = pokemons.filter(({ type }) => type === button.textContent);
      pokefilter.forEach((pokemon, pokeIndex, array) => {
        expect(screen.getByTestId(buttonID)).toHaveTextContent(pokemon.name);
        if (pokeIndex !== array.length - 1) userEvent.click(buttonNext);
      });
    });
    /* Testa se o botão All precisa estar sempre visível. */
    expect(screen.getByRole('button', { name: /all/i })).toBeVisible();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    /* Testa se o texto do botão deve ser All */
    expect(allButton).toHaveTextContent('All');

    const verifyNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    /* Testa se a Pokedéx mostra os Pokémons normalmente (sem filtros)
    quando o botão All for clicado; */
    userEvent.click(allButton);
    pokemons.forEach((button) => {
      const pokefilter = pokemons.filter(({ type }) => type === button.textContent);
      pokefilter.forEach((pokemon, pokeIndex, array) => {
        expect(screen.getByTestId(buttonID)).toHaveTextContent(pokemon.name);
        if (pokeIndex !== array.length - 1) userEvent.click(verifyNext);
      });
    });
  });
});
