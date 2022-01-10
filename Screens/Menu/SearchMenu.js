import React, {useCallback, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {action_searchmenu} from '../../Services/Actions/MenuActions';
const SearchMenu = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState('');
  const scroll = useSelector(state => state.MenuReducers.scroll);
  const handleSearch = useCallback(
    async value => {
      setsearch(value);
      dispatch(action_searchmenu(value));
    },
    [dispatch],
  );
  return (
    <SearchBar
      style={{fontSize: 16}}
      containerStyle={{
        backfaceVisibility: 'hidden',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        height: 50,

        justifyContent: 'center',
        elevation: 10,
        marginBottom: scroll ? null : 50,
      }}
      platform="android"
      round={true}
      showLoading={true}
      lightTheme={true}
      placeholder="Search Menu"
      onChangeText={value => handleSearch(value)}
      value={search}
    />
  );
};
export default SearchMenu;
