import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TemplateSelector = ({ currentTemplate, onChangeTemplate }) => {
  const { t } = useTranslation();

  const templates = [
    { 
      id: 'modern', 
      name: t('templates.modern'),
      description: 'Clean layout with modern design elements',
      color: 'bg-blue-600'
    },
    { 
      id: 'classic', 
      name: t('templates.classic'),
      description: 'Traditional invoice styling',
      color: 'bg-green-600'
    },
    { 
      id: 'minimal', 
      name: t('templates.minimal'),
      description: 'Simple and distraction-free',
      color: 'bg-purple-600'
    },
    { 
      id: 'elegant', 
      name: t('templates.elegant'),
      description: 'Sophisticated design with accents',
      color: 'bg-yellow-600'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Select Template</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map(template => (
          <motion.div
            key={template.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChangeTemplate(template.id)}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-lg border-2 ${currentTemplate === template.id ? 'border-blue-500' : 'border-gray-700'}`}
          >
            <div className={`h-3 ${template.color}`}></div>
            <div className="p-4 bg-gray-800">
              <h4 className={`font-medium ${currentTemplate === template.id ? 'text-white' : 'text-gray-300'}`}>
                {template.name}
              </h4>
              <p className="text-sm text-gray-400 mt-1">{template.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">Click to preview</span>
                {currentTemplate === template.id && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Selected
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;