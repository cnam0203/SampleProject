import React from 'react';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';
import {BasicButton} from './Button';
import {listMenu} from '../constant';

export const MenuScreen = ({navigation, menuId}) => {
  const {nextScreen, menu} = listMenu[menuId];
  const {darkTheme} = React.useContext(AppContext);

  return (
    <ScreenContainer theme={darkTheme}>
      {menu.map((item, index) => (
        <BasicButton
          key={index}
          title={item.title}
          navigation={navigation}
          onPress={() => {
            navigation.push(nextScreen, {
              menuId: item.menuId,
              api: item.api,
              title: item.title,
            });
          }}
        />
      ))}
    </ScreenContainer>
  );
};
