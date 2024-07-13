import {BrowserRouter as Router} from 'react-router-dom';
import {render} from '@testing-library/react';
import NavBar from './NavBar';

test('renders logo image', () => {
  const {getByAltText} = render(
    <Router>
      <NavBar logoImgUrl="testLogo.png" routes={[]}/>
    </Router>
  );

  const logoImage = getByAltText('logo');

  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAttribute('src', 'testLogo.png');
});

test('renders routes', () => {
  const routes = [
    {path: '/path1', text: 'Route 1'},
    {path: '/path2', text: 'Route 2'},
  ];

  const {getAllByRole} = render(
    <Router>
      <NavBar logoImgUrl="testLogo.png" routes={routes}/>
    </Router>
  );

  const links = getAllByRole('link');

  expect(links.length).toBe(routes.length);
  routes.forEach((route, index) => {
    expect(links[index]).toHaveTextContent(route.text);
  });
});

test('renders user menu', () => {
  const UserMenu = () => <div>Menu</div>;
  const {getByText} = render(
    <Router>
      <NavBar logoImgUrl="testLogo.png" routes={[]} userMenuElement={<UserMenu/>}/>
    </Router>
  );

  const menu = getByText('Menu');

  expect(menu).toBeInTheDocument();
});