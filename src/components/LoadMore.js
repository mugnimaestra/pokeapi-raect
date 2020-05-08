import React, { useRef } from 'react';
import verge from 'verge';
import { useEventListener } from '../lib/customHooks';
import _ from 'lodash';

const LoadMore = ({ getNextPage, isLoading }) => {
  const loadComponent = useRef();

  const loadMore = _.debounce(() => {
    if (verge.inViewport(loadComponent.current)) {
      getNextPage();
    }
  }, 1000);

  useEventListener("scroll", loadMore);

  const style = {
    margin: '1rem',
    cursor: 'pointer',
  }

  return <div ref={loadComponent} onClick={getNextPage} style={style}>{isLoading ? 'Loading more pokemons....' : 'Click to load more pokemons'}</div>;
};

export default LoadMore;