import React from 'react';
import styled from 'styled-components'
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import { mobile } from '../responsive';



const Wrapper = styled.div`
    position: absolute;
    top: 20px;
    left: -50%;
    ${mobile({ left: "-90%;" })}
    background-color: #FFF;
    ${mobile({ padding: "10px 0px;" })}
    min-height: 100px;
    height: fit-content;
    min-width: 180px;
    width: fit-content;
    ${mobile({ width: "180px;" })}
    z-index: 1;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: none;
`;
const Container = styled.div`
    position: relative;
    width: 100px;
    height: 32px;
    ${mobile({ height: "50px;" })}
    &:hover ${Wrapper} {
        display: block; 
    }
`;



const ProfileList = styled.ul`
    list-style: none;
    padding: 12px;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ProfileItem = styled.li`
    width: 100%;
    text-align: left;
    padding-block: 4px;
`;

const Border = styled.hr`
    width: 92%;
    margin: 0 auto;
`;

const Profile = () => {
    return (
        <Container>
            <Person4OutlinedIcon style={{ color: 'teal', cursor: 'pointer' }} />
            <Wrapper>
                <ProfileList>
                    <ProfileItem>Hello <span>John</span></ProfileItem>
                    <ProfileItem>+91xxxxxxxxxx</ProfileItem>
                </ProfileList>
                <Border />
                <ProfileList>
                    <ProfileItem>Edit Profile</ProfileItem>
                    <ProfileItem>Logout</ProfileItem>
                </ProfileList>
            </Wrapper>
        </Container>
    )
}

export default Profile;