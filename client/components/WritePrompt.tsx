import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';

const WritePrompt: React.FC = () => {
  return (
    <Link to="/newpost" style={{ textDecoration: 'none', color: 'black' }}>
      <div className="write_prompt">
        <div className="prompt-child">
          <CreateIcon fontSize="large" color="primary" />
        </div>
        <div className="prompt-child" id="prompt-heading">
          <h2>
            {' '}
            Write <s>y</s>our story!
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default WritePrompt;
