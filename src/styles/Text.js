import styled from 'styled-components';

// Styled Text component for inline text
export const Text = styled.span`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ weight }) => weight || 'bold'};
  color: ${({ color }) => color || 'inherit'}; // Optional: add color prop
`;

// Styled SmallText component for smaller inline text
export const SmallText = styled(Text)`
  font-size: 12px;
  font-weight: normal;
`;

// Styled Paragraph component for block text
export const Paragraph = styled.p`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  color: ${({ color }) => color || 'inherit'}; // Optional: add color prop
  margin: 0; // Optional: reset margin for consistent spacing
`;
