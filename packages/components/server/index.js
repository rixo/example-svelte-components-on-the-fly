import { setupCwd, buildComponent } from './build.js'
import { serve } from './serve.js'

setupCwd()

serve({ buildComponent }).listen(4000)
