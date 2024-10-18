import axios from 'axios';
import { useEffect, useState } from 'react';
import { REPO_URLS } from '../api/apiUrls';

const useGithubRepositoryInfo = () => {
  const [contributors, setContributors] = useState([]);
  const [repoStats, setRepoStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributorsResponse = await axios.get(REPO_URLS.CONTRIBUTORS);
        setContributors(contributorsResponse.data);

        const repoResponse = await axios.get(REPO_URLS.REPO_DETAILS);
        setRepoStats({
          stars: repoResponse.data.stargazers_count,
          forks: repoResponse.data.forks_count,
          openIssues: repoResponse.data.open_issues_count,
        });
      } catch (err) {
        setError(err);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contributors, repoStats, loading, error };
};

export default useGithubRepositoryInfo;
