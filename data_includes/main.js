PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

PennController.AddHost("https://raw.githubusercontent.com/awpzs/VW_Norming/master/images/")

Sequence( "information", "identification", "instruction", "instruction_5", "instruction_6", "practice_start", "practice", "practice_end", "experiment", "send", "final" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
)

newTrial( "identification" ,
    newText("<p>Please provide your ID before proceeding to the instructions.</p>")
        .print()
    ,
    newTextInput("inputID", "Your ID")
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("instruction.csv")
            , variable =>
    newTrial( "instruction" ,
        newHtml("information", variable.insPage)
            .print()
        ,
        newImage("example", variable.exImg)
            .settings.center()
            .print()
        ,
        newButton("Proceed")
            .settings.center()
            .print()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "instruction_5" ,
    newHtml("information", "instruction_5.html")
        .print()
    ,
    newImage("example", "instructionD.jpg")
        .settings.center()
        .print()
    ,
    newTextInput("Response", "Put your description here")
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Proceed")
        .settings.center()
        .print()
        .wait()
)
.log( "ID"     , getVar("ID")    )

newTrial( "instruction_6" ,
    newHtml("information", "instruction_6.html")
        .print()
    ,
    newButton("Proceed")
        .settings.center()
        .print()
        .wait()
)
.log( "ID"     , getVar("ID")    )   

newTrial( "practice_start" ,
    newText("<p>Let's start with some practice trials. </p><p>Please describe the object in the box below the pictures. Once finished, please click on <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("pracdesign.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "practice" ,
        newImage("img", variable.$Image)
            .size(800, 512)
            .settings.center()
            .print()
        ,
        newTextInput("Response", "")
            .log("final")
            .settings.center()
            .print()
        ,
        newButton("continue", "Continue")
            .settings.center()
            .print()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.list   )
  .log( "Identifier"   , variable.$identifier   )
  .log( "Exp"   , variable.$exp   )
  .log( "Item"   , variable.$item   )
  .log( "Target", variable.$targetImg)
  .log( "Condition"   , variable.$condition   )
  .log( "Rational"   , variable.$rational   )
)

newTrial( "practice_end" ,
    newText("<p>We will now start the experiment. Please take a break about the halfway through (as indicated by the progress bar above).</p>")
        .print()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("fulldesign.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "experiment" ,
        newImage("img", variable.$Image)
            .size(800, 512)
            .settings.center()
            .print()
        ,
        newTextInput("Response", "")
            .log("final")
            .settings.center()
            .print()
        ,
        newButton("continue", "Continue")
            .settings.center()
            .print()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.list   )
  .log( "Identifier"   , variable.$identifier   )
  .log( "Exp"   , variable.$exp   )
  .log( "Item"   , variable.$item   )
  .log( "Target", variable.$targetImg)
  .log( "Condition"   , variable.$condition   )
  .log( "Rational"   , variable.$rational   )
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://stir.ac.uk' href='_blank'>Click here to finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newButton("void")
        .wait()
)
