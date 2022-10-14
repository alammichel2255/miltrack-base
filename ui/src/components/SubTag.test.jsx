// src/App.test.js
import { render, screen } from '@testing-library/react';

// You have to import the PersonList component
import SubTag from './SubtagTag';

const testObject = {
    id: 1, pha_date: "03/21/2021", dental_date: "02/01/2019", hearing_date: "07/25/1995", full_name: "Justin Hernandez", rank: "SSG"  
}

describe('SubTag', () => {
  it('renders a SubTag', async () => {
    const indivTag = render(<SubTag elements={ testObject } />);
    // `getByText` select text from the imported component
    const fullName = await indivTag.findByText("full_name");
    //console.log(fullName);
    expect(fullName).toBeInTheDocument();
  });
})