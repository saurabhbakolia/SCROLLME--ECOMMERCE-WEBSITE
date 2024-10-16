import styled from 'styled-components';

// General Divider
export const Divider = styled.div`
  background-color: ${({ color }) => color || 'gray'};
`;

// Top Divider
export const TopDivider = styled(Divider)`
  height: 1px; // Thickness of the line
  width: 100%; // Full width
`;

// Bottom Divider
export const BottomDivider = styled(Divider)`
  height: 1px; // Thickness of the line
  width: 100%; // Full width
`;

// Left Divider
export const LeftDivider = styled(Divider)`
  width: 1px; // Thickness of the line
  height: 100%; // Full height
`;

// Right Divider
export const RightDivider = styled(Divider)`
  width: 1px; // Thickness of the line
  height: 100%; // Full height
`;

// Vertical Divider for left and right
export const VerticalDivider = styled(Divider)`
  width: 1px; // Thickness of the line
  height: ${({ height }) => height || '100%'}; // Dynamic height
  margin: 0 10px; // Optional spacing
`;

// Horizontal Divider for top and bottom
export const HorizontalDivider = styled(Divider)`
  height: 1px; // Thickness of the line
  width: ${({ width }) => width || '100%'}; // Dynamic width
  margin: 10px 0; // Optional spacing
`;
