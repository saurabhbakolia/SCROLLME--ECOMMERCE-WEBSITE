import { IconButtonWrapper } from '../../styles/Button';

const IconButton = ({ icon, color, background, onClick, size }) => {
  return (
    <IconButtonWrapper color={color} background={background} onClick={onClick} size={size}>
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
