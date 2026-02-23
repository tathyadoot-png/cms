import { motion } from 'framer-motion'

export default function KpiCard({
  title,
  value,
  color,
}: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-xl text-white bg-gradient-to-r ${color} shadow-lg`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </motion.div>
  )
}