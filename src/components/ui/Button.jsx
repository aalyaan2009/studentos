import { motion } from 'framer-motion'
import { buttonClasses } from '../../utils/buttonClasses'

export function Button({ variant = 'primary', size = 'md', className, type = 'button', children, ...props }) {
  return (
    <motion.button
      type={type}
      whileHover={props.disabled ? undefined : { y: -1, scale: 1.01 }}
      whileTap={props.disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </motion.button>
  )
}
