---
title: "Chapter 3: Incompatible observables & the Heisenberg uncertainty principle" 
short_title: "Ch. 3: Incomp. Obs. & HUP"
numbering:
  enumerator: 3.%s
---

In this Chapter we will learn about one of the basic aspects of quantum mechanics — **incompatible observables** . As we will see in more detail below, quantum mechanics predicts that it is **impossible for a particle to have multiple definite properties at the same time**. For example, a particle cannot have a definite position and a definite momentum simultaneously, or a definite energy and a definite position (as just two examples). In fact, we can say much more than this, and this is really the main lesson: there is a strong **trade-off** between **how well-defined** properties can be. That is, if a particle has a fairly well defined position, this necessitates it having a broad spread of momenta. This is the content of the famous **Heisenberg uncertainty principle** (HUP), which we will introduce here. This is a fundamental fact about nature, and shows that certain observable properties are **incompatible** with each other. 

## Gaussian example

We can illustrate the main idea behind the incompatibility of position and momentum by considering a simple example — that of a **gaussian wavefunction**. Consider the following wavefunction 
```{math}
:label: e-gaussian-wf
\psi(x) = \sqrt{\frac{1}{a\sqrt{2\pi}}} e^{-x^2/4a^2},
```
with a parameter $a > 0$, which determines the **width** of the wavefunction, and where $\sqrt{\frac{1}{a\sqrt{2\pi}}}$ is a normalisation factor, which ensures that this is a normalised wavefunction (this is left as an [exercise](#ex-norm-gaussian)). This wavefunction is depicted below:
```{figure}  ./Pictures/gaussian
:label: f-gaussian
:alt: Picture of a gaussian function
:width: 400px
:align: center
A Gaussian wavefunction, as given by [](#e-gaussian-wf). The parameter $a>0$ determines the 'width' of the wavefunction. 
```


As we can see, it has the Bell-curve shape, and is centred at the origin. [Direct calculations](#ex-gaussian-mean-var) show that the expected position and standard deviation are 
```{math}
:label: e-gaussian-x
\av{x} &= 0,\\
\Delta x &= \sqrt{\av{x^2} - \av{x}^2} = a.
```
The fact that the standard deviation $\Delta x$ is equal to $a$ is the reason we say that $a$ determines the width (since it uniquely specifies the standard deviation, which is a very useful and common way of quantifying the width of a probability density function). What does it mean for the particle to have a small width? It means that if we were to measure the position, we would be very likely to find the particle within a small region of space (in this case, close to the origin, since this is the only region where the probability density $\pd(x) = |\psi(x)|^2$ is large). This is where we should think of the quantum particle as being located, roughly speaking. If on the other hand $a$ becomes large, then the particle will be found in a larger region of space when we measure its position. 

The question we would now like to ask is what momentum does the particle have, as we consider varying the width of the spatial wavefunction $a$? We can answer this by finding the momentum wavefunction $\tilde{\psi}(p)$, which determines the probability density $\pd(p) = |\tilde{\psi}(p)|^2$ for the particle to have momentum $p$. 

In an [exercise](#ex-mom-wf-gaussian), you will show that
```{math}
:label: e-gaussian-p
\tilde{\psi}(p) = \sqrt{\frac{\sqrt{2}a}{\sqrt{\pi}\hbar}}e^{-a^2p^2/\hbar^2}.
```
(Remarkably) this is **also a Gaussian** (now in the variable $p$ instead of $x$). However, the expected momentum and standard deviation of momentum are 
```{math}
:label: e-gaussian-p
\av{p} &= 0,\\
\Delta p &= \sqrt{\av{p^2} - \av{p}^2} = \frac{\hbar}{2a}.
```
What we see is that the spread of momentum is now **inversely proportional** to $a$. This means that if $a$ becomes smaller — so that the particle has a smaller width in space (more precisely, so that a measurement of the position of the particle is likely to find it closer to the origin), it gains a bigger spread of momentum, meaning that a momentum measurement would find that the particle has large momentum with  higher probability. Conversely, if the wavefunction has a wider width (a is larger), the spread of momentum in fact goes down! 

## The Heisenberg Uncertainty Principle

We often refer to these widths as **uncertainties**, since they tell us how uncertain our measurements of position and momentum will be. That is, how close or far we are from obtaining a very deterministic outcome when performing a measurement of that property of the particle. 

What is remarkable is that what we observed above **isn't just a special property of Gaussian wavefunctions**, but is a general fact about quantum mechanics. In fact, 
> It is impossible in quantum mechancis for a particle to simultaneously have a small uncertainty $\Delta x$ in position and a small uncertainty $\Delta p$ in momentum.

The famous **Heisenberg Uncertainty Principle** makes this statement **quantitative**: it says that the **product** of the uncertainties can never be smaller than a fundamental constant:
````{card}
```{math}
\Delta x \Delta p \geq \frac{\hbar}{2}.
```
````

```{aside}
*We will not prove the Heisenberg Uncertainty Principle in this unit, but merely state it as a fact of quantum mechanics. An interested student will be able to find a proof in any textbook on quantum mechanics.*
```

This shows that if we have a particle in a particular quantum state $\ket{\psi}$ with corresponding spatial wavefunction $\psi(x)$, and we calculate the uncertainty in the position of the particle $\Delta x$, then even before calculating the momentum wavefunction, we already know that $\Delta p \geq \hbar/2\Delta x$. Hence if $\Delta x$ is small, then this implies that $\Delta p$ is necessarily going to be large. 

Returning to our Gaussian wavefunction example from above, we saw in [](#e-gaussian-x) and [](#e-gaussian-p) that $\Delta x = a$ and $\Delta p = \hbar/2a$, and so in this case
```{math}
\Delta x \Delta p = a \times \frac{\hbar}{2a} = \frac{\hbar}{2},
```
that is, independent of $a$, a Gaussian wavefunction **saturates** the HUP: its product of uncertainties in position and momentum are in fact as small as allowed by quantum mechanics! We won't prove this, but it can be shown that **Gaussian wavefunctions are the only wavefunctions which saturate the HUP**. As we will see in numerous examples, $\Delta x \Delta p > \hbar/2$ for any other non-Gaussian wavefunction. For this reason, you will see the Gaussian wavefunction referred to as the **minimum uncertainty wavefunction** in some textbooks. We will also see later on in this unit, that the Gaussian wavefunction is very important, as it corresponds to an ground state (the energy eigenstate of lowest energy) of a harmonic oscillator — i.e. the quantum description of a mass on a spring, or a pendulum, or, in fact the electromagnetic field!

## Incompatible Observables

Because of the fact that position and momentum satisfy the HUP, we say that that are **incompatible observables**: these are two properties of a quantum particle that are somehow in *conflict* or *tension* with each other — such that having one property well defined precludes the other property being well defined too. This is a completely novel aspect of quantum mechanics compared to classical physics, where there is no such difficulty. For example, in classical mechanics, a particle has both a definite position and a definite momentum at all times.

Crucially, it is not just position and momentum which are incompatible. In fact **most observable properties are incompatible in quantum mechanics!** That is, apart from some special cases, if we consider two distinct physical properties, it is very likely that they are incompatible, and that a particle cannot have definite values for both properties simultaneously.

The question we will answer in the next section is **how to determine whether two observables are incompatible or not?** We will see that this is determined to a purely **mathematical** property of the **operators** associated to each observable property, known as **commutation**:

> Two physical observables are compatible if (and only if) their associated operators **commute**.

We will explain what this means in the next section. 

## Commutation

Recall that operators are things which 'act' on a quantum state. It is possible to act with **multiple** operators in a **sequence**. We can therefore ask a natural question: whether the **order** matters or not. That is, if we act with one operator and then a second, is this the same as first acting with the second operator, followed by the first? The answer in general is **no**. This is precisely what is captured by **commutation**: two operators commute if the two orders lead to the **same action**. On the other hand, two operators for which the two orders lead to different overall actions are said to **not commute**. 

In order to capture this mathematically, we introduce the so-called **commutator** of two operators. We denote the commutator of (two arbitrary operators) $\hat{A}$ and $\hat{B}$ by $[\hat{A}, \hat{B}]$, and it is defined by
````{card}
```{math}
:label: e-commutator
[\hat{A},\hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}.
```
````
That is, the commutator is the **difference** between the two orders. Having introduced the commutator, we can re-state in a more succinct manner what it means for two operators to commute: 
> $\hat{A}$ and $\hat{B}$ commute if (and only if) $[\hat{A}, \hat{B}] = 0$. 

This is because the commutator will vanish if $\hat{A}\hat{B} = \hat{B}\hat{A}$, i.e. precisely when the two different orders coincide. 
```{aside}
*We note that there is something that is a little strange here, and can be misleading. While commutation is about the **order** of operators, this doesn't imply that imcompatibility of observables is **also** about order. This is a common misconception. The link is in fact a very mathematical one: commutation is a succinct way of determining whether two operators have common **eigenstates** (i.e. whether the eigenstates of one operator happen to coincide with the eigenstates of another operator or not). It is this property which is crucial for compatibility, and it happens that this will be the case only when operators commute.*
```

In the context of **quantum mechanics**, we are usually interested not in the operators $\hat{A}$ and $\hat{B}$ directly, but rather thier associated operators $\op{A}$ and $\op{B}$ (that act on wavefunctions $\psi(x)$ rather than on quantum states $\ket{\psi}$). We will use the same notation to refer to the associated commutator in this context:
````{card}
```{math}
:label: e-commutator-wf
[\op{A}, \op{B}]\psi(x) = \op{A}\left(\op{B}\psi(x)\right) - \op{B}\left(\op{A}\psi(x)\right),
```
````
where we have additionally included brackets, to make it clear exactly what it means in this case. Note that, in this case, we really **need** the wavefunction in order for this to make sense properly, even though the wavefunction is **completely arbitrary**. 

Crucially, the commutation of any two operators $\hat{A}$ and $\hat{B}$ can be determined from $\op{A}$ and $\op{B}$. To explain what this means, we will use the example of $\hat{X}$ and $\hat{P}$. As an [exercise](#ex-x-p-comm), you will show that
```{math}
[\op{X}, \op{P}]\psi(x) &= x\left(-i\hbar\frac{\partial}{\partial x}\psi(x)\right) + i\hbar\frac{\partial}{\partial x}\left(x\psi(x)\right) \\ &= i\hbar \psi(x).
```
From this we can 'read off' the commutator of $\hat{X}$ and $\hat{P}$: 
````{card}
```{math}
:label: e-canonical-comm
[\hat{X}, \hat{P}] = i\hbar.
```
````
This is often referred to as the **canonical commutation relation** since it is so important and central. 

To arrive at [](#e-canonical-comm), we simply replaced everywhere $\op{X}$ and $\op{P}$ by $\hat{X}$ and $\hat{P}$, and removed the wavefunction. This is generally true. Namely, 
````{card}
```{math}
[\op{A},\op{B}]\psi(x) = \op{C}\psi(x) \implies [\hat{A},\hat{B}] = \hat{C}.
```
````
That is, we calculate the commutator of $\op{A}$ and $\op{B}$ on a wavefunction $\psi(x)$, and call this $\op{C}\psi(x)$ (in general, it will be some operator acting on the wavefunction). Then, from this, using [](#e-op-to-wf-op) we can find the corresponding operator $\hat{C}$ associated to $\op{C}$.  

Coming back to the big picture: we see in [](#e-canonical-comm) that $\hat{X}$ and $\hat{P}$ do not commute, and hence (as we already knew in this case!) they are **incompatible observables**. If we now want to consider other pairs of properties, and want to know if they are incompatible or not, we follow the same procedure: we calculate the commutator of their associated operators (most likely the operators acting on their wavefunctions) and whether or not this vanishes answers our physical question. 

## Exercises

````{exercise}
:label: ex-norm-gaussian
Show that the Gaussian wavefunction ![](#e-gaussian-wf) where $a>0$ is a positive constant, is normalised. You may wish to make use of [](gaussian-integrals).
````
````{exercise}
:label: ex-gaussian-mean-var
Show that for the Gaussian wavefunction ![](#e-gaussian-wf) where $a>0$ is a positive constant, the expected position and standard deviation are ![](#e-gaussian-x)

````

````{exercise}
:label: ex-mom-wf-gaussian
Using [](#e-psi-x-to-psi-p), show that the momentum wavefunction associated to the Gaussian wavefunction ![](#e-gaussian-wf) is given by ![](#e-gaussian-p) You may wish to make use of [](gaussian-integrals).
````

````{exercise}
:label: ex-x-p-comm
In this exercise we prove the canonical commutation relation. Consider an arbitrary wavefunction $\psi(x)$.
1. Calculate $\op{X}\left(\op{P}\psi(x)\right)$.
1. Calculate $\op{P}\left(\op{X}\psi(x)\right)$.
1. Using your answers to parts (1) and (2), calculate $[\op{X},\op{P}]\psi(x)$. 
1. Explain why
```{math}
[\hat{X},\hat{P}]\ket{\psi} = \infint \left([\op{X},\op{P}]\psi(x)\right)\ket{x} dx.
```
1. Finally, using parts (3) and (4), find $[\hat{X},\hat{P}]$. 

````{exercise}
:label: ex-3-5
Consider the particle from [](#ex-1-1), ![](#e-wf-ex-1-1) which we showed in [](#ex-mom-wf-1-1) had momentum wavefunction ![](#e-mom-wf-1-1)

1. Show that both $\psi(x)$ and $\tilde{\psi}(p)$ are **even** functions. 
```{note} Hint
Recall that an even function is one such that $f(-y) = f(y)$.
  ```
2. Explain why this implies that both the average position and average momentum are zero,
\begin{equation*}
	\langle x \rangle &= 0,& \langle p \rangle &= 0.
\end{equation*}
3. Calculate the average square position of the particle, $\langle x^2 \rangle$, and the standard deviation, $\Delta x~=~\sqrt{\langle x^2\rangle - \langle x \rangle^2}$.

It can be shown that the average square momentum of the particle is 
\begin{equation*} 
        \vph \langle p^2 \rangle = \frac{5\hbar^2}{2a^2}.
\end{equation*}
4. Calculate the standard deviation in the momentum of the particle, $\Delta p = \sqrt{\langle p^2 \rangle - \langle p \rangle^2}$.

5. Show that the particle satisfies the HUP. How close is the particle to saturating the bound of the uncertainty principle?
````