export type ContactAction = 'copy' | 'external';

export type ContactItem = {
  label: string;
  value: string;  
  href?: string;   
  action: ContactAction;
};

export type ContactNote = {
  prefix: string; 
  cta: string;    
  suffix: string; 
  pdfUrl: string;  
};
