PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

//PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "information", "identification", "instruction", "practice_start", "practice", "practice_end", "experiment", "send", "final" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
)

newTrial( "indentification" ,
    newText("<p>Please provide your ID before proceeding to the instructions.</p>")
    ,
    newTextInput("inputID", "Your ID")
        .settings.center()
        .log()
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
        newTextInput("Response", variable.text)
            .log("final")
        ,
        newButton("Understood")
            .before( getTextInput("Response") )
            .settings.center()
            .print()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "practice_start" ,
    newText("<p>Let's start with some practice trials. Please describe the object in the box below the pictures. Once finished, please press ENTER or click on Continue to proceed.</p>")
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("pracdesign.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "practice" ,
        ,
        newImage("img", variable.$Image)
            .size(800, 512)
            .settings.center()
            .print()
        ,
        newTextInput("Response", "")
            .log("final")
        ,
        newButton("continue", "Continue")
            .before( getTextInput("Response") )
            .settings.center()
            .print()
        ,
        newSelector("proceed")
            .add( getButton("continue") )
            .keys( "Enter" )
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.list   )
  .log( "Identifier"   , variable.$identifier   )
  .log( "Exp"   , variable.$exp   )
  .log( "Item"   , variable.$item   )
  .log( "Condition"   , variable.$condition   )
  .log( "Rational"   , variable.$rational   )
)

newTrial( "practice_end" ,
    newText("<p>We now start the experiment. Please take a break about the halfway through (as indicated by “progress”).</p>")
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
        ,
        newImage("img", variable.$Image)
            .size(800, 512)
            .settings.center()
            .print()
        ,
        newTextInput("Response", "")
            .log("final")
        ,
        newButton("continue", "Continue")
            .before( getTextInput("Response") )
            .settings.center()
            .print()
        ,
        newSelector("proceed")
            .add( getButton("continue") )
            .keys( "Enter" )
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.list   )
  .log( "Identifier"   , variable.$identifier   )
  .log( "Exp"   , variable.$exp   )
  .log( "Item"   , variable.$item   )
  .log( "Condition"   , variable.$condition   )
  .log( "Rational"   , variable.$rational   )
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://stir.ac.uk' href='_blank'>Click here to end the experiment</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
