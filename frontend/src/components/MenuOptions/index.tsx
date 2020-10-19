import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

import { Menu } from './styles';

interface IMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  to: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const MenuOptions: React.FC<IMenuProps> = ({ name, to, icon: Icon }) => {
  return (
    <Menu>
      <Link to={to}>
        {Icon && <Icon size={20} />}
        {name}
      </Link>
    </Menu>
  );
};

export default MenuOptions;
