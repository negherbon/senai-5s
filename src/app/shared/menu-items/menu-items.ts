import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: null,
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'users',
        name: 'Usuários',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'advance',
        name: 'Avaliações',
        type: 'link',
        icon: 'ti-check-box'
      },
      {
        state: 'advance',
        name: 'Ambientes',
        type: 'link',
        icon: 'ti-location-pin'
      },
      {
        state: 'advance',
        name: 'Perguntas',
        type: 'link',
        icon: 'ti-agenda'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
