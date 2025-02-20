import { useState } from 'react';
import { DropdownProps } from './interfaces/dropdown.interface';

const Dropdown = ({ options, onSelect }: Readonly<DropdownProps>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<{value: string, label: string} | null>(null);

  // Función para manejar la selección
  const handleSelect = (option:{value: any, label: string}) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

 // Función para manejar el estado del dropdown
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative w-full">
      <button type= "button" onClick={toggleDropdown} className="px-2 py-1 w-full border rounded-md bg-white text-charcoal-950">
        <span className='text-left'>  
          {selected ? selected.label : 'Selecciona una opción'}
        </span>
      </button>
      {isOpen && (
      <ul className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
        {options.map((option) => (
          <li
            key={option.value}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelect(option)}
          >
           {option.label}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default Dropdown;
