import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import HomeHeader from './HomeHeader';
import './Home.css';

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  technologiesUsed: string[];
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_TOOL_URL as string);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <HomeHeader />

      <Box sx={{ padding: '1rem 2rem', textAlign: 'left' }}>
        <Typography variant="h2" gutterBottom>Some personal tools I have worked on</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 2rem 2rem 2rem' }}>
        {projects.map((project, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" gutterBottom>{project.name}</Typography>
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="project-image"
                />
              </Box>
              <Divider sx={{ marginBottom: '1rem' }} />
              <Typography variant="h4" gutterBottom>Description</Typography>
              <Typography variant="body1" paragraph>{project.description}</Typography>
              <Typography variant="h4" gutterBottom>Technologies Used</Typography>
              <Typography variant="body1" paragraph>{project.technologiesUsed.join(', ')}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Home;