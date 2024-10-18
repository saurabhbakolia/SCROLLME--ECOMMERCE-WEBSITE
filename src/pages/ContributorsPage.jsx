import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useGithubRepositoryInfo from '../hooks/useGithubRepositoryInfo';
import ContributorCard from '../components/contributors/ContributorCard';
import StatCard from '../components/contributors/StatCard';
import { ContributorIcon, ForksIcon, GitHubStarsIcon, TotalContributionsIcon } from '../assets/icons/Icons';
import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to right, rgb(2, 241, 245), #5ff5dc);
  height: 90vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: black;
    opacity: 0.5;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 4xl;
  padding: 0 1rem;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  color: white;

  @media (min-width: 640px) {
    font-size: 4rem;
  }

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #bee3f8;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const ContributeButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  margin-top: 2rem;
  font-weight: bold;
  color: #2c7a7b;
  background: white;
  border-radius: 9999px;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #edf2f7;
  }
`;

const StatsSection = styled.section`
  padding: 4rem 1rem;
  background-color: white;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const StatsTitle = styled.h2`
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1a202c;
`;

const ContributorsSection = styled.section`
  padding: 4rem 1rem;
  background-color: white;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const ContributorsTitle = styled.h2`
  margin-bottom: 3rem;
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  color: #1a202c;
`;

const ContributeSection = styled.section`
  padding: 4rem 1rem;
  background-color: #2c7a7b;
  color: white;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const ContributeTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
`;

const ContributeText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 24rem;
  padding: 0.5rem 1rem;
  color: #2d3748;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #38b2ac;
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: bold;
  color: teal;
  background: white;
  border-radius: 9999px;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #edf2f7;
  }
`;

const StatisticsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ContributorsPage = () => {
  const [email, setEmail] = useState('');
  const { contributors, repoStats, loading } = useGithubRepositoryInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <HeroSection>
          <HeroContent>
            <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Our Amazing Contributors
            </Title>
            <Subtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              Shaping the future of ScrollMe, one commit at a time
            </Subtitle>
            <ContributeButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              href='#contribute'
            >
              Become a Contributor
            </ContributeButton>
          </HeroContent>
        </HeroSection>

        <StatsSection>
          <StatsTitle>Project Statistics</StatsTitle>
          <StatisticsGrid contributors={contributors} repoStats={repoStats} />
        </StatsSection>

        <ContributorsSection>
          <ContributorsTitle>Meet Our Contributors</ContributorsTitle>
          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex items-center justify-center h-64'
              >
                <div className='w-32 h-32 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin'></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              >
                {contributors.map((contributor) => (
                  <ContributorCard key={contributor.id} {...contributor} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ContributorsSection>

        <ContributeSection id='contribute'>
          <ContributeTitle>Join Our Contributors</ContributeTitle>
          <ContributeText>
            Be a part of something great! Whether you're fixing bugs, adding features, or creating new ideas, your contributions matter.
          </ContributeText>
          <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-4'>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full max-w-md px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring focus:ring-teal-500'
              required
            />
            <Button type='submit'>Submit Email</Button>
          </form>
        </ContributeSection>
      </MainContainer>
      <Footer />
    </>
  );
};

export default ContributorsPage;

const StatisticsGrid = ({ contributors, repoStats }) => {
  const totalContributions = contributors.reduce((sum, contributor) => sum + contributor.contributions, 0);

  const stats = [
    {
      label: 'Contributors',
      value: contributors.length,
      icon: <ContributorIcon />
    },
    {
      label: 'Total Contributions',
      value: totalContributions,
      icon: <TotalContributionsIcon />
    },
    {
      label: 'GitHub Stars',
      value: repoStats.stars || 0,
      icon: <GitHubStarsIcon />
    },
    {
      label: 'Forks',
      value: repoStats.forks || 0,
      icon: <ForksIcon />
    }
  ];

  return (
    <StatisticsGridContainer>
      {stats.map((stat, index) => (
        <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
      ))}
    </StatisticsGridContainer>
  );
};
