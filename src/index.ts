#! /usr/bin/env node

import { StoryboardParser } from "./storyboard/storyboard_parser"


const main = async () => {
  const fileParser = new StoryboardParser(
    "/mnt/Data/Workspace/4.MobileHealth/5.iOS/appointment-ios/MaNaDr/Modules/Clinic Visit/Detail/CVAppointmentDetail.storyboard"
  )
  await fileParser.convert()
}
main()
