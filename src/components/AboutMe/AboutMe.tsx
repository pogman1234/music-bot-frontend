import React, { useState } from 'react';
import { Box, Typography, Avatar, Chip, Grid, Card, CardContent, CardMedia, Modal, Backdrop, Fade } from '@mui/material';
import HomeHeader from '../Home/HomeHeader';
import nicImage from '../../assets/nic.png';
import project1 from '../../assets/proxmox.png';
import project2 from '../../assets/project2.png';
import michigan from '../../assets/michigan.png';
import kitties from '../../assets/kitties.jpg';

const Skills: React.FC = () => {
  const skills = [
    "GCP", "Cloud Run", "Python", "Jenkins", "JavaScript", "React", "Docker", "Kubernetes", "Groovy", "Dynatrace", ".NET"
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>Technical Skills</Typography>
      <Grid container spacing={1}>
        {skills.map((skill) => (
          <Grid item key={skill}>
            <Chip label={skill} sx={{ margin: 0.5 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ProjectCard: React.FC<{ title: string; description: string; image: string }> = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <Card sx={{ marginBottom: '1rem' }} onClick={() => handleOpen(image)} aria-label={`View larger image of ${title}`}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 140,
            width: '100%',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img src={selectedImage} alt={title} style={{ width: '50%', height: '50%' }} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const AboutMe: React.FC = () => (
  <>
    <HomeHeader /> 
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '2rem', 
      bgcolor: 'background.paper', 
      color: 'text.primary' 
    }}>
      <Avatar 
        alt="Nicholas" 
        src={nicImage} 
        sx={{ width: 150, height: 200, marginBottom: '1rem' }} 
      />
      <Typography variant="h4" gutterBottom>
        Nicholas
      </Typography>
      <Typography variant="body1" align="center">
        SRE | Web | Software Engineer | Building Reliable and Scalable Systems
      </Typography>
    </Box>
    <Box sx={{ justifyContent: 'center', alignItems: 'center', padding: '1rem', bgcolor: 'background.paper', color: 'text.primary'}}>
      <hr style={{ border: 'none', borderTop: '1px solid', color: 'divider' }} />
    </Box>
    <Grid container spacing={2} sx={{ padding: '1rem', bgcolor: 'background.paper', color: 'text.primary' }}>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Favorite Personal Projects
        </Typography>
        <ProjectCard title="Personal Server" 
        description="
        I have a personal old enterprise server that I use for various projects. 
        As of now, I have Proxmox installed on it and I use it to host various VMs and containers. 
        For example, I have an ARK Survival Evolved server hosted that friends and myself play on.

        I also have a few other VMs that I use for various projects and testing.

        " 
        image={project1} />
        <ProjectCard title="pogman.xyz" 
        description="
        I then have my website which is a frontend hosted on Firebase, which connects to another Cloud Run instance that serves as the backend.
        The backend is a music bot that I have been working on for a while now written in Python which uses the discord.py library. My friends and I use it to play music in our discord server.
        " 
        image={project2} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" align="center">
            I am a Site Reliability Engineer and Web Developer with a passion for building reliable and scalable systems. I enjoy working on personal projects and exploring new technologies.

            I currently am working on this website and a music bot to play music in my friends and my Discord server.
          </Typography>
        </Box>
        <Skills />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Favorite things
        </Typography>
        <ProjectCard title="Up North" description="
        My favorite thing to do is go Up North to visit family. This includes the wineries in Traverse City, breweries in and around Petoskey, and a cabin in the woods on the eastern side of the UP.
        I have been to the Western side once, Keewenaw Bay is incredibly gorgeous.
        " 
        image={michigan} />
        <ProjectCard title="Alice and Meeka" description="
        My cats Alice (right) and Meeka (left). They love watching squirrels and birds.
        " 
        image={kitties} />
      </Grid>
    </Grid>
  </>
);

export default AboutMe;